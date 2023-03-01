import { ExecutionContext,createParamDecorator, NotFoundException } from "@nestjs/common";

export const User = createParamDecorator((filter: string, context : ExecutionContext) => {
   

    try{



        const user = context.switchToHttp().getRequest().user;

        if(!user){
            throw new NotFoundException('User not found')
        }

        if(!filter){
            return user
        }
    
        return user[filter]
    }
    catch(e){
        throw new NotFoundException('User not found')
    }



});