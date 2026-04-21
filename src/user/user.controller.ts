import { Body, Controller, Get, Headers, Param, Post, Put, Req } from '@nestjs/common';
import { User, UserService } from './user.service';
import { request } from 'https';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}


    @Get()
    getUser(){
        return {success: true, message: 'Hurray! 🎉. User endpoint is working!' , details: this.userService.getAllUser()}
    }

    @Get("/:id")
    getUserById(@Param() param) {
        const result : User | { success: boolean; message: string } = this.userService.getUserById(Number(param.id));
        return { success: true, message: 'Hurray! 🎉. User endpoint is working!' , details: result }
    }


    @Post()
    createUser(@Body() body) {
        // console.log('Request Body:', request.body);
        const newUser = this.userService.createUser(body);
        return {success: true, message: 'Hurray! 🎉. User created successfully!' , details: newUser}
    }

    @Put("/:id")
    updateUser(@Param() param, @Body() body) {
        const updatedUser = this.userService.updateUser(Number(param.id), body);
        return {success: true, message: 'Hurray! 🎉. User updated successfully!' , details: updatedUser}
    }
}

