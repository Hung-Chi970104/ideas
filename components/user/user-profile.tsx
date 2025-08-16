import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Crown } from "lucide-react"

export function UserProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Profile
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/diverse-user-avatars.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">john@example.com</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                <Crown className="h-3 w-3 mr-1" />
                Pro Plan
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                React
              </Badge>
              <Badge variant="outline" className="text-xs">
                Python
              </Badge>
              <Badge variant="outline" className="text-xs">
                Design
              </Badge>
              <Badge variant="outline" className="text-xs">
                Marketing
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Interests</h4>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                FinTech
              </Badge>
              <Badge variant="outline" className="text-xs">
                Health Tech
              </Badge>
              <Badge variant="outline" className="text-xs">
                AI/ML
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
