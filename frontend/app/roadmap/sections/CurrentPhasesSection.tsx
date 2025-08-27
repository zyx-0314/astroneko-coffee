"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Circle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { RoadmapItem } from "@/schema/roadmap.schema";
import { number } from "zod";

interface CurrentPhasesSectionProps {
  filteredItems: RoadmapItem[];
}

export default function CurrentPhasesSection({
  filteredItems,
}: CurrentPhasesSectionProps) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItemExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "planned":
        return <Circle className="h-5 w-5 text-gray-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return (
      <Badge className={colors[priority as keyof typeof colors]}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  if (filteredItems.length === 0) {
    return (
      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Current Development
        </motion.h2>
        <div className="text-center py-12">
          <Circle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No items match your filters
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your category or status filters to see more items.
          </p>
        </div>
      </div>
    );
  }

  // Separate completed and active items
  const completedItems = filteredItems.filter(
    (item) => item.status === "completed"
  );
  const activeItems = filteredItems.filter(
    (item) => item.status !== "completed"
  );

  const computeProgress = (item: RoadmapItem) => {
    const totalFeatures = item.features.length;
    const completedFeatures = item.features.filter(
      (feature) => feature.done
    ).length;
    return totalFeatures > 0 ? (completedFeatures / totalFeatures) * 100 : 0;
  };

  return (
    <div className="mb-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
      >
        Current Development
      </motion.h2>

      {/* Active Items (In Progress & Planned) */}
      <div className="space-y-6 mb-8">
        {activeItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(item.priority)}
                    <Badge variant="outline">{item.quarter}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {item.status === "in-progress" && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Progress
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {computeProgress(item)}%
                      </span>
                    </div>
                    <Progress value={computeProgress(item)} className="h-2" />
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        {feature.done ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : item.status ? (
                          <Clock className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Completed Items - Minimized */}
      {completedItems.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Completed Features ({completedItems.length})
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center gap-2"
            >
              {showCompleted ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {showCompleted ? "Hide" : "Show"} Completed
            </Button>
          </div>

          {showCompleted && (
            <div className="space-y-4">
              {completedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader
                      className="cursor-pointer"
                      onClick={() => toggleItemExpansion(item.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(item.status)}
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                              {item.title}
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            COMPLETED
                          </Badge>
                          <Badge variant="outline">{item.quarter}</Badge>
                          {expandedItems.has(item.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    {expandedItems.has(item.id) && (
                      <CardContent>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Key Features:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {item.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {feature.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
