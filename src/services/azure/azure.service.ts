import { Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import {
  EmailClient,
  EmailMessage,
  EmailSendOptionalParams,
} from '@azure/communication-email';

@Injectable()
export class AzureService {
  private emailClient = new EmailClient(
    process?.env?.CONNECTION_STRING_AZURE_COMMUNICATION_SERVICE,
  );
  async uploadFile(fileName: string, file: any) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.CONNECTION_STRING_AZURE,
    );
    const containerClient =
      blobServiceClient.getContainerClient('hotels-container');
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });
    return blockBlobClient.url;
  }
  async sendEmail(message: EmailMessage, options?: EmailSendOptionalParams) {
    const poller = await this.emailClient.beginSend(message, options);
    return await poller.pollUntilDone();
  }
}
