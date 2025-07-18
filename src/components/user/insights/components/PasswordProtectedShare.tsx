import React from 'react';
import { Lock, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PasswordProtectedShareProps {
  onClose: () => void;
}

export const PasswordProtectedShare: React.FC<PasswordProtectedShareProps> = ({ onClose }) => {
  const [password, setPassword] = React.useState('');
  const [expiryDays, setExpiryDays] = React.useState('7');
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Share Protected Link
          </CardTitle>
          <CardDescription>
            Create a password-protected shareable link for this report
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="share-password">Password</Label>
            <Input 
              id="share-password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password for access"
            />
          </div>
          <div>
            <Label htmlFor="expiry">Link expires in</Label>
            <Select value={expiryDays} onValueChange={setExpiryDays}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Generate Link</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
