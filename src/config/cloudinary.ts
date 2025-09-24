import { v2 as cloudinary } from "cloudinary";
import config from "@/lib/config";

const { apiKey, apiSecret, cloudName } = config.env.cloudnary;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary;
