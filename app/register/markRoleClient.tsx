'use client';

//icons
import {AlertTriangle} from "lucide-react"

// Global imports
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// compoenets
import Heading from "../components/ui/Heading";
import { Button } from "@/app/components/ui/button";
import { SafeUser } from "@/app/types";
import { Card, CardContent } from "@/app/components/ui/card";
import { useGenerate } from "@/hooks/useGenerate";


interface roleClientProps {
  user: SafeUser | null;
}

const MarkRoleClient: React.FC<roleClientProps> = ({
  user,
}) => {
  const accessCodeModal = useGenerate();
  const [assignRoleId, setAssignRoleId] = useState("");
  const router = useRouter();

  const onAssign = (id: any, role: string) => {
        
  };

  return (
    <Card className="select-none w-full m-0 sticky ">
      <CardContent className="mt-3">
        <div className="flex flex-row justify-between items-center">
          <Heading
            title="Registration Page"
            subtitle="Fill the Below Form with necessary details"
          />

          <p className="flex flex-row gap-2 text-amber-600">
          <AlertTriangle /> Note: Wait for final Verification from College Administration
          </p>
          <div className="col-span-3 flex flex-row gap-0 text-base">
            <Button
              variant={`${user?.role === 'student' ? "default" : "outline"}`}
              className={`${user?.role === 'student' ? "bg-violet-700 dark:text-white" : "bg-transparent"}
                rounded-l-full hover:bg-violet-700 hover:border-violet-700`}
              size="sm"
              onClick={() => onAssign(user?.id, 'student')}
            >Student</Button>
            <Button
              variant={`${user?.role === 'teacher' ? "default" : "outline"}`}
              className={`${user?.role === 'teacher' ? "bg-violet-700 dark:text-white" : "bg-transparent"}
                rounded-r-full hover:bg-violet-700 hover:border-violet-700`}
              size="sm"
              onClick={() => accessCodeModal.onOpen(user?.role)}
            >Teacher</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MarkRoleClient;