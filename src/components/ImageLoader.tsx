import { AdvancedImage, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { fill } from "@cloudinary/url-gen/actions/resize";

import React from "react";

export const ImageLoader = ({
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dq4rxwjrh",
    },
  });

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image("ncc_001");

  myImage.delivery(quality("auto:best")).resize(fill().aspectRatio("4:3"));

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
