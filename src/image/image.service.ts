import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from "fs";
import * as path from "path";

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

const IMAGE_DIR = path.resolve(__dirname + '../../../static/images')

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(image: Express.Multer.File, createImageDto: CreateImageDto) {
    const fileName = this.getRandomImageFileName();
    const filePath = path.join(IMAGE_DIR, fileName);

    try {
      // save image to /static/images
      fs.writeFileSync(filePath, image.buffer);
      // update image field of the room with image's path
      createImageDto.imageName = fileName;
      const rs = await this.imageRepository.save(createImageDto);
      console.log('New image added successfully!', rs)
      return rs['imageId'];
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return await this.imageRepository.find();
  }

  async findOne(id: number) {
   
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  getRandomImageFileName(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = 32;
    let fileName = '';
    // Loop for the length of the file name
    for (let i = 0; i < length; i++) {
      // Pick a random character from the alphabet
      let char = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      // Append the character to the file name
      fileName += char;
    }
    // Return the file name with a .jpg extension
    return fileName + ".jpg";
  }
}
