"use client";

import {ImageIcon} from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import {FileUpload} from "./file-upload";

export interface ImageProps {
  disabled: boolean;
  isEditing: boolean;
  onChange: (url: string) => void;
  value?: string;
  setIsEditing: () => void;
}

export const ImageField = ({disabled, isEditing, onChange, value, setIsEditing}: ImageProps) => {
  return (
    <div className="border border-input rounded-md">
      {!isEditing &&
        (!value ? (
          <div className="flex items-center justify-center rounded-md h-48 bg-muted/10">
            <ImageIcon className="w-10 h-10 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md object-center"
              src={value}
            />
          </div>
        ))}
      {isEditing && (
        <FileUpload
          endpoint="image"
          onChange={(url) => {
            if (url) {
              onChange(url);
              setIsEditing();
            }
          }}
        />
      )}
    </div>
  );
};
