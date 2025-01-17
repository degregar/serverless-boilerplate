import { MiddlewareObj } from "@middy/core";
import { ZodSchema } from "zod";
import { HttpError } from "../errors/http.error";
import { StatusCodes } from "http-status-codes";

export const zodValidator = <T>(schema: ZodSchema<T>): Required<Pick<MiddlewareObj<any, any>, "before">> => ({
  before: async (request) => {
    if (!schema) return;

    const { event } = request;
    const parserResult = schema.safeParse(event);

    if (!parserResult.success) {
      throw new HttpError(parserResult.error.issues, StatusCodes.BAD_REQUEST);
    }

    event.body = parserResult.data?.body ?? event.body;
    event.queryStringParameters = parserResult.data?.queryStringParameters ?? event.queryStringParameters;
    event.headers = parserResult.data?.headers ?? event.headers;
  },
});
