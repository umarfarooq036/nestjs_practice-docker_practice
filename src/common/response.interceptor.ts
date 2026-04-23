import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";


@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return {
                    success: true,
                    message: data?.message || "Request Successful!",
                    data: data?.data ?? data,
                };
            })
        )
    }

}