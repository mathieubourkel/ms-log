import { RpcException } from "@nestjs/microservices";

export abstract class BaseUtils {
    
   _Ex = (
    message: string | string[],
    statusCode: number,
    code: string
  ): never => {
    throw new RpcException({
      message,
      statusCode,
      context: {
        ms: "log",
        error: {
          errorCode: code,
        },
      },
    });
  };

  _catchEx = (error: any) => {
    throw new RpcException(error.error || error.message);
  };
}

