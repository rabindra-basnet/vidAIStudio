import { Button } from "@/components/ui/button";
import React, { useState } from "react";

// const voiceOptions = [
//   { name: "🇺🇸 Achernar (Female)", value: "achernar", gender: "Female" },
//   { name: "🇺🇸 Achird (Male)", value: "achird", gender: "Male" },
//   { name: "🇺🇸 Algenib (Male)", value: "algenib", gender: "Male" },
//   { name: "🇺🇸 Algieba (Male)", value: "algieba", gender: "Male" },
//   { name: "🇺🇸 Alnilam (Male)", value: "alnilam", gender: "Male" },
//   { name: "🇺🇸 Aoede (Female)", value: "aoede", gender: "Female" },
//   { name: "🇺🇸 Autonoe (Female)", value: "autonoe", gender: "Female" },
//   { name: "🇺🇸 Callirrhoe (Female)", value: "callirrhoe", gender: "Female" },
//   { name: "🇺🇸 Charon (Male)", value: "charon", gender: "Male" },
//   { name: "🇺🇸 Despina (Female)", value: "despina", gender: "Female" },
//   { name: "🇺🇸 Enceladus (Male)", value: "enceladus", gender: "Male" },
//   { name: "🇺🇸 Erinome (Female)", value: "erinome", gender: "Female" },
//   { name: "🇺🇸 Fenrir (Male)", value: "fenrir", gender: "Male" },
//   { name: "🇺🇸 Gacrux (Male)", value: "gacrux", gender: "Male" },
//   { name: "🇺🇸 Iapetus (Male)", value: "iapetus", gender: "Male" },
//   { name: "🇺🇸 Kore (Female)", value: "kore", gender: "Female" },
//   { name: "🇺🇸 Laomedeia (Female)", value: "laomedeia", gender: "Female" },
//   { name: "🇺🇸 Leda (Female)", value: "leda", gender: "Female" },
//   { name: "🇺🇸 Orus (Male)", value: "orus", gender: "Male" },
//   { name: "🇺🇸 Puck (Male)", value: "puck", gender: "Male" },
//   { name: "🇺🇸 Pulcherrima (Female)", value: "pulcherrima", gender: "Female" },
//   { name: "🇺🇸 Rasalgethi (Male)", value: "rasalgethi", gender: "Male" },
//   { name: "🇺🇸 Sadachbia (Male)", value: "sadachbia", gender: "Male" },
//   { name: "🇺🇸 Sadaltager (Male)", value: "sadaltager", gender: "Male" },
//   { name: "🇺🇸 Schedar (Male)", value: "schedar", gender: "Male" },
//   { name: "🇺🇸 Sulafat (Male)", value: "sulafat", gender: "Male" },
//   { name: "🇺🇸 Umbriel (Male)", value: "umbriel", gender: "Male" },
//   { name: "🇺🇸 Vindemiatrix (Female)", value: "vindemiatrix", gender: "Female" },
//   { name: "🇺🇸 Zephyr (Female)", value: "zephyr", gender: "Female" },
//   { name: "🇺🇸 Zubenelgenubi (Male)", value: "zubenelgenubi", gender: "Male" },
// ];
const voiceOptions = [
  { name: "🇺🇸 Achernar (Female)", value: "achernar", gender: "Female" },
  { name: "🇺🇸 Achird (Male)", value: "achird", gender: "Male" },
  { name: "🇺🇸 Algenib (Male)", value: "algenib", gender: "Male" },
  { name: "🇺🇸 Aoede (Female)", value: "aoede", gender: "Female" },
  { name: "🇺🇸 Autonoe (Female)", value: "autonoe", gender: "Female" },
];

const Voice = ({ onHandleInputChange, isMissing }) => {
  // State to hold the selected voice
  const [selectedVoice, setSelectedVoice] = useState("Kore");

  return (
    <div className="my-3">
      <h2 className="text-lg font-semibold mb-2">
        Voice<span className="text-red-500">*</span>
      </h2>

      <p
        className={`text-sm mb-3 ${
          isMissing ? "text-red-500" : "text-gray-400 dark:text-gray-400"
        }`}
      >
        {isMissing
          ? "You must select a voice before continuing."
          : `Select Voice for Video: ${selectedVoice}`}
      </p>
      {/* <div className="overflow-scroll h-60 scrollbar-hide scroll-smooth"> */}
        <div className="grid grid-cols-2 gap-3 m-3">
          {voiceOptions.map((voice, index) => (
            <h2
              className={`cursor-pointer p-2 border rounded-lg dark:bg-slate-900 dark:border-white hover:border-blue-500  hover:scale-105 ${selectedVoice === voice.value ? "border-blue-500" : "border-gray-300"}`}
              key={index}
              onClick={(e) => {
                setSelectedVoice(voice.value);
                onHandleInputChange("voice", voice.value);
              }}
            >
              {voice.name}
            </h2>
          ))}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Voice;
