import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentialDefaultProvider: () => {
    return {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET
    }
  },
});
const docClient = DynamoDBDocumentClient.from(client);

async function getItem(artist, title) {
  const command = new GetCommand({
    TableName: "Music",
    Key: {
      Artist: artist,
      SongTitle: title,
    },
  });

  const result = await docClient.send(command);
  return result.Item ?? null
}
const MusicItem = await getItem('Dream Theater', 'Surrounded')
console.log(MusicItem)