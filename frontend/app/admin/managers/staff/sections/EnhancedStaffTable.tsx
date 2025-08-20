'use client'

import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { staffAPI } from "@/lib/api/staff.api"
import { Staff, UserRole, EmploymentType } from "@/schema/staff.schema"

interface EnhancedStaff extends Staff {
  totalHours?: number;
  performance?: number;
}

interface EnhancedStaffTableProps {
  staff: EnhancedStaff[]
  onStaffUpdate: () => void
}

export default function EnhancedStaffTable({ 
  staff: initialStaff, 
  onStaffUpdate 
}: EnhancedStaffTableProps) {
  const [filteredStaff, setFilteredStaff] = useState<EnhancedStaff[]>(initialStaff)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [employmentFilter, setEmploymentFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)

  // Update filtered staff when initial staff changes
  useEffect(() => {
    setFilteredStaff(initialStaff)
  }, [initialStaff])

  // Apply filters
  useEffect(() => {
    let filtered = [...initialStaff]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(staff => 
        staff.firstName?.toLowerCase().includes(term) ||
        staff.lastName?.toLowerCase().includes(term) ||
        staff.email?.toLowerCase().includes(term) ||
        staff.phone?.toLowerCase().includes(term) ||
        staff.employeeId?.toLowerCase().includes(term)
      )
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(staff => staff.role === roleFilter)
    }

    // Employment type filter
    if (employmentFilter !== 'all') {
      filtered = filtered.filter(staff => 
        staff.employmentType === employmentFilter
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        filtered = filtered.filter(staff => staff.isActive === true)
      } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(staff => staff.isActive === false)
      }
    }

    setFilteredStaff(filtered)
  }, [initialStaff, searchTerm, roleFilter, employmentFilter, statusFilter])

  const clearFilters = () => {
    setSearchTerm('')
    setRoleFilter('all')
    setEmploymentFilter('all')
    setStatusFilter('all')
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.MANAGER:
        return 'default'
      case UserRole.CASHIER:
        return 'secondary'
      case UserRole.COOK:
        return 'outline'
      case UserRole.BARISTA:
        return 'outline' 
      case UserRole.HELPER:
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const getEmploymentTypeBadge = (type: EmploymentType) => {
    switch (type) {
      case EmploymentType.FULL_TIME:
        return { variant: 'default' as const, text: 'Full Time' }
      case EmploymentType.PART_TIME:
        return { variant: 'secondary' as const, text: 'Part Time' }
      case EmploymentType.CONTRACT:
        return { variant: 'outline' as const, text: 'Contract' }
      case EmploymentType.INTERN:
        return { variant: 'outline' as const, text: 'Intern' }
      default:
        return { variant: 'secondary' as const, text: 'Unknown' }
    }
  }

  const handleToggleStatus = async (staffId: number, currentStatus: boolean) => {
    setIsLoading(true)
    try {
      // Use the deactivateStaff API method for now
      if (currentStatus) {
        await staffAPI.deactivateStaff(staffId)
        toast.success('Staff deactivated successfully')
      } else {
        // For activation, we would need to update the staff record
        const updateData = { isActive: true }
        await staffAPI.updateStaff(staffId, updateData)
        toast.success('Staff activated successfully')
      }
      onStaffUpdate()
    } catch (error) {
      console.error('Error toggling staff status:', error)
      toast.error('Failed to update staff status')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteStaff = async (staffId: number) => {
    if (!confirm('Are you sure you want to delete this staff member? This action cannot be undone.')) {
      return
    }

    setIsLoading(true)
    try {
      await staffAPI.deleteStaff(staffId)
      toast.success('Staff member deleted successfully')
      onStaffUpdate()
    } catch (error) {
      console.error('Error deleting staff:', error)
      toast.error('Failed to delete staff member')
    } finally {
      setIsLoading(false)
    }
  }

  const formatSalary = (salary?: number) => {
    if (!salary) return 'Not set'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(salary)
  }

  const activeFiltersCount = [
    searchTerm,
    roleFilter !== 'all' ? roleFilter : null,
    employmentFilter !== 'all' ? employmentFilter : null,
    statusFilter !== 'all' ? statusFilter : null,
  ].filter(Boolean).length

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="flex items-center gap-2">
            Staff Management
            <Badge variant="secondary">{filteredStaff.length} members</Badge>
          </CardTitle>
          
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters ({activeFiltersCount})
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Role Filter */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
              <SelectItem value={UserRole.CASHIER}>Cashier</SelectItem>
              <SelectItem value={UserRole.COOK}>Cook</SelectItem>
              <SelectItem value={UserRole.BARISTA}>Barista</SelectItem>
              <SelectItem value={UserRole.HELPER}>Helper</SelectItem>
            </SelectContent>
          </Select>

          {/* Employment Type Filter */}
          <Select value={employmentFilter} onValueChange={setEmploymentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={EmploymentType.FULL_TIME}>Full Time</SelectItem>
              <SelectItem value={EmploymentType.PART_TIME}>Part Time</SelectItem>
              <SelectItem value={EmploymentType.CONTRACT}>Contract</SelectItem>
              <SelectItem value={EmploymentType.INTERN}>Intern</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Info</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Employment</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    {searchTerm || roleFilter !== 'all' || employmentFilter !== 'all' || statusFilter !== 'all'
                      ? 'No staff members match your filters'
                      : 'No staff members found'
                    }
                  </TableCell>
                </TableRow>
              ) : (
                filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {staff.firstName} {staff.lastName}
                        </div>
                        {staff.employeeId && (
                          <div className="text-sm text-muted-foreground">
                            ID: {staff.employeeId}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(staff.role)}>
                        {staff.role}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      {staff.employmentType && (
                        <Badge variant={getEmploymentTypeBadge(staff.employmentType).variant}>
                          {getEmploymentTypeBadge(staff.employmentType).text}
                        </Badge>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{staff.email}</div>
                        {staff.phone && (
                          <div className="text-sm text-muted-foreground">
                            {staff.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        {formatSalary(staff.salary)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={staff.isActive ? 'default' : 'secondary'}>
                        {staff.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              // TODO: Implement edit functionality
                              toast.info('Edit functionality coming soon')
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(staff.id, staff.isActive)}
                            disabled={isLoading}
                          >
                            {staff.isActive ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteStaff(staff.id)}
                            disabled={isLoading}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
