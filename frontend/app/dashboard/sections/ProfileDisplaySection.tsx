import { motion } from 'framer-motion';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Gift, Star } from 'lucide-react';
import { User } from '@/schema/user.schema';
import { ProfileDisplaySectionProps } from '@/schema';

export default function ProfileDisplaySection({ user }: ProfileDisplaySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
              <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                <AvatarImage src={user.avatar ? user.avatar : user.sex === 'female' ? '/placeholder/user/Female.png' : '/placeholder/user/Male.png'} />
                <AvatarFallback className="text-lg sm:text-xl">
                  {user.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="mt-3 sm:mt-0">
                <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Ready for your cosmic coffee experience?</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl sm:text-3xl font-bold">{user.points}</span>
              </div>
              <p className="text-sm text-muted-foreground">Stellar Points</p>
              <Badge className="mt-2 text-xs">
                <Gift className="w-3 h-3 mr-1" />
                250 points = Free drink!
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
