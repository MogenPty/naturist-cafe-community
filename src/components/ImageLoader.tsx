import { AdvancedImage, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { fill } from "@cloudinary/url-gen/actions/resize";

import React from "react";

export interface ImageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  cloudName?: string;
  publicId?: string;
  alt?: string;
  aspectRatio?: string;
}

export const ImageLoader = ({
  cloudName = "dq4rxwjrh",
  publicId = "ncc_001",
  aspectRatio = "4:3",
  ...rest
}: ImageLoaderProps) => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(publicId);

  myImage
    .delivery(quality("auto:best"))
    .resize(fill().aspectRatio(aspectRatio));

  // Render the transformed image in a React component.
  return (
    <AdvancedImage
      style={{ width: "100%", height: "auto" }}
      cldImg={myImage}
      plugins={[responsive({ steps: 100 })]}
      {...rest}
    />
  );
};
