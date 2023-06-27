import { Injectable } from '@nestjs/common';
import  { SecretsManager } from "@aws-sdk/client-secrets-manager"

@Injectable()
export class AwsService {
    private secretsManager:SecretsManager;
    constructor(){
        this.secretsManager= new SecretsManager({region:"us-east-1"})
    }
    getDatabaseSecrets(){
        return new Promise((resolve,reject)=>this.secretsManager.getSecretValue({SecretId:process.env.DATABASE_SECRETID},(err,data)=>{
            if(err) {reject(err); return;}
            const rdsCredentials:RDSCredentials=JSON.parse(data.SecretString);
            const env=process.env;
            env.DATABASE_ENDPOINT=rdsCredentials.host;
            env.DATABASE_NAME=rdsCredentials.dbInstanceIdentifier;
            env.PORT=rdsCredentials.port.toString();
            env.POSTGRES_USER=rdsCredentials.username;
            env.POSTGRES_PASSWORD=rdsCredentials.password;
            resolve(true)
        }))
    }
}
