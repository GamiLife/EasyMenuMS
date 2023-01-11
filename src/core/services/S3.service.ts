import { Injectable } from "@nestjs/common/decorators";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { mimeByBuffer } from "../helpers/mimeType.helper";

export type TFileStorageInfo = {
  fileName: string;
  fileUrl: string;
  Key: string;
};

export interface IS3Service {
  uploadFile: (dataBuffer: Buffer, fileName: string) => Promise<any>;
}

@Injectable()
export class S3Service implements IS3Service {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(dataBuffer: Buffer, fileName: string) {
    try {
      const { mime } = await mimeByBuffer(dataBuffer);

      const s3 = new S3();
      const awsBucket = this.configService.get("AWS_BUCKET_NAME");

      const result = await s3
        .upload({
          Bucket: awsBucket,
          Body: dataBuffer,
          Key: `${new Date().getTime()}-${fileName
            .toLowerCase()
            .split(" ")
            .join("_")}`,
          ContentType: mime,
        })
        .promise();

      const fileStorageInfo = {
        fileName,
        fileUrl: result.Location,
        Key: result.Key,
      };

      return fileStorageInfo;
    } catch (error) {
      throw new Error("Error on uploading s3 File");
    }
  }
}
