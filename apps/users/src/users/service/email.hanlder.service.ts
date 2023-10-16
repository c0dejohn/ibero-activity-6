import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { EmailHandlerRepository } from '../../repositories/email-handler.repository';

@Injectable()
export class EmailHanlderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailHandlerRepository: EmailHandlerRepository,
  ) {}

  async dispatch(userEmail: string) {
    await this.emailHandlerRepository.dispatch({
      name: 'User',
      email: userEmail,
      subject: 'Bienvinid@',
      message: this.emailTemplate(),
    });
  }

  private emailTemplate() {
    return `

    Bienvenid@ a Nuestra Plataforma
    
    ¡Gracias por unirte a nosotros! Estamos emocionados de tenerte como parte de nuestra comunidad.
     Esperamos que disfrutes de todos los servicios y recursos que ofrecemos. Si tienes alguna pregunta o necesitas asistencia, 
     no dudes en ponerte en contacto con nuestro equipo de soporte.
      
     Atentamente,
     Tu equipo de bienvenida
`;
  }
}
