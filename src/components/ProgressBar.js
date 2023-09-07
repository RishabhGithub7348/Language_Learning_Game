import  { useState } from "react";
import { Progress } from "@nextui-org/react";

export default function ProgressBar({value}) {
    const progress = value*10;

    
  return (
    <div>
      <Progress       
        size="md"
        value={progress}
        color="success"
        className=" max-w-5xl"
      />
    </div>
  );
}


