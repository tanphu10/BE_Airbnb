import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocationService {
  constructor(private jwtService: JwtService) {}
  model = new PrismaClient();
  async findAll() {
    let data = await this.model.location.findMany();
    return { status: 200, response: data };
  }

  async findOne(id: number) {
    let data = await this.model.location.findUnique({ where: { id } });
    return { status: 200, response: data };
  }

  async create(createLocationDto: CreateLocationDto) {
    let data = await this.model.location.create({ data: createLocationDto });
    return { status: 200, message: 'đã tạo thành công', response: data };
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    let data = await this.model.location.update({
      data: updateLocationDto,
      where: { id },
    });
    return { status: 200, message: 'update thành công', response: data };
  }

  async remove(id: number) {
    await this.model.location.delete({ where: { id } });
    return { status: 200, content: `đã xóa thành công ${id}` };
  }
  async uploadImg(token: string, files: Express.Multer.File, locateId: number) {
    // console.log(token);
    // console.log(files);
    // console.log(locateId);
    let decodeToken: any = this.jwtService.decode(token);
    let { role } = decodeToken.data;
    // console.log(role);
    if (role == 'ADMIN') {
      // console.log(decodeToken.data);
      let data = await this.model.location.findFirst({
        where: { id: locateId },
      });
      let newData = { ...data, photo: files.filename };
      let updateImg = await this.model.location.update({
        data: newData,
        where: { id: locateId },
      });
      return {
        status: 201,
        message: 'upload hình vị trí thành công thành công',
        content: updateImg,
      };
    } else {
      return {
        status: 400,
        message: 'User không có quyền upload hình',
      };
    }
  }
}
