"use client";

import { AdvancedImage, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/actions/resize";
import type React from "react";

export interface ImageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  cloudName?: string;
  publicId?: string;
  alt?: string;
  aspectRatio?: string;
  height?: string | number;
  width?: string | number;
}

export const ImageLoader = ({
  cloudName = "dq4rxwjrh",
  publicId = "ncc_001",
  aspectRatio = "none",
  height = "auto",
  width = "auto",
  ...rest
}: ImageLoaderProps) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(publicId);

  myImage.delivery(quality("auto:best"));

  if (aspectRatio === "none") {
    const resizeTransform = auto();
    if (typeof width === "number") resizeTransform.width(width);
    if (typeof height === "number") resizeTransform.height(height);
    if (typeof width === "number" || typeof height === "number") {
      myImage.resize(resizeTransform);
    }
  } else {
    myImage.resize(auto().aspectRatio(aspectRatio));
  }
  // Render the transformed image in a React component.
  return (
    <AdvancedImage
      cldImg={myImage}
      plugins={[responsive({ steps: 100 })]}
      {...rest}
    />
  );
};
