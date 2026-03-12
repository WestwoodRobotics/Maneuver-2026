import { Label } from "@/core/components/ui/label";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Settings, Weight, Car, Code } from "lucide-react";
import type { DrivetrainType, ProgrammingLanguage } from "@/types/database";

interface TechnicalSpecificationsProps {
  weight?: number;
  drivetrain?: DrivetrainType;
  gearRatio?: number;
  programmingLanguage?: ProgrammingLanguage;
  onWeightChange: (value: number | undefined) => void;
  onDrivetrainChange: (value: DrivetrainType | undefined) => void;
  onGearRatioChange: (value: number | undefined) => void;
  onProgrammingLanguageChange: (value: ProgrammingLanguage | undefined) => void;
}

export function TechnicalSpecifications({
  weight,
  drivetrain,
  gearRatio,
  programmingLanguage,
  onWeightChange,
  onDrivetrainChange,
  onGearRatioChange,
  onProgrammingLanguageChange,
}: TechnicalSpecificationsProps) {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      onWeightChange(undefined);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        onWeightChange(numValue);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Technical Specifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weight Input */}
        <div className="space-y-2">
          <Label htmlFor="weight" className="flex items-center gap-2">
            <Weight className="h-4 w-4" />
            Robot Weight (lbs)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="e.g., 125"
            value={weight ?? ""}
            onChange={handleWeightChange}
            min="0"
            step="0.1"
            className="text-lg"
          />
          <p className="text-sm text-muted-foreground">
            Optional: Robot weight in pounds (with bumpers and battery)
          </p>
        </div>

        {/* Drivetrain Select */}
        <div className="space-y-2">
          <Label htmlFor="drivetrain" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Drivetrain Type
          </Label>
          <Select
            value={drivetrain ?? "unspecified"}
            onValueChange={(value) =>
              onDrivetrainChange(value === "unspecified" ? undefined : (value as DrivetrainType))
            }
          >
            <SelectTrigger id="drivetrain" className="text-lg">
              <SelectValue placeholder="Select drivetrain type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unspecified">Not specified</SelectItem>
              <SelectItem value="swerve">Swerve Drive</SelectItem>
              <SelectItem value="tank">Tank Drive</SelectItem>
              <SelectItem value="mecanum">Mecanum Drive</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Optional: Type of drivetrain used by the robot
          </p>
        </div>

        {/* Gear Ratio Input */}
        <div className="space-y-2">
          <Label htmlFor="gearRatio" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Drivetrain Gear Ratio
          </Label>
          <Input
            id="gearRatio"
            type="number"
            placeholder="e.g., 6.75"
            value={gearRatio ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                onGearRatioChange(undefined);
              } else {
                const numValue = parseFloat(value);
                if (!isNaN(numValue) && numValue > 0) {
                  onGearRatioChange(numValue);
                }
              }
            }}
            min="0"
            step="0.01"
            className="text-lg"
          />
          <p className="text-sm text-muted-foreground">
            Optional: Overall gear ratio of the drivetrain (e.g., 6.75:1 → enter 6.75)
          </p>
        </div>

        {/* Programming Language Select */}
        <div className="space-y-2">
          <Label htmlFor="programmingLanguage" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Programming Language
          </Label>
          <Select
            value={programmingLanguage ?? "unspecified"}
            onValueChange={(value) =>
              onProgrammingLanguageChange(value === "unspecified" ? undefined : (value as ProgrammingLanguage))
            }
          >
            <SelectTrigger id="programmingLanguage" className="text-lg">
              <SelectValue placeholder="Select programming language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unspecified">Not specified</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
              <SelectItem value="C++">C++</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="LabVIEW">LabVIEW</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Optional: Primary programming language used for robot code
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
