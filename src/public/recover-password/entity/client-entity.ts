import { AppointmentEntity } from "src/employ/appointment/entities/appointment.entity";
import { QuestionSecretEntity } from "src/public/register/entity/question-secret.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VehicleEntity } from "src/client/vehicles/entities/vehicle.entity";
import { SmartwatchLinkEntity } from 'src/client/smartwatch/smartwatch-link.entity';


@Entity('clients')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ type: 'varchar', length: 100 })
    apellido_paterno: string;  // Campo para 'apellido_paterno'

    @Column({ type: 'varchar', length: 100 })
    apellido_materno: string;  // Campo para 'apellido_materno'

    @Column({ type: 'varchar', length: 100, unique: true })
    correo: string;  // Campo para 'correo', debe ser único

    @Column({ type: 'varchar', length: 20 })
    telefono: string;  // Campo para 'telefono'

    @Column({ type: 'varchar', length: 255 })
    contrasena: string;  // Campo para 'contraseña'

    @Column({ type: 'varchar', length: 20, default: 'client' })
    rol: string;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.cliente)
    appointments: AppointmentEntity[]

    @ManyToOne(() => QuestionSecretEntity, (preguntaSecreta) => preguntaSecreta.clientes, { eager: true })
    @JoinColumn({ name: 'idPreguntaSecreta' })
    preguntaSecreta: QuestionSecretEntity

    @Column({ type: 'varchar', length: 255 })
    respuestaSecreta: string;

    // Nueva columna: estado (ENUM)
    @Column({ type: 'enum', enum: ['activo', 'bloqueado'], default: 'activo' })
    estado: 'activo' | 'bloqueado';

    // Nueva columna: fechaDesbloqueo (puede ser nula si no está bloqueado)
    @Column({ type: 'datetime', nullable: true })
    fechaDesbloqueo: Date | null;

    @Column({ type: "int", default: 0 })  // 🚀 Nueva columna para intentos fallidos
    intentosFallidos: number;

    @OneToMany(()=> VehicleEntity,(vehicle) => vehicle.idPropietario)
    vehiculos: VehicleEntity[]

    @Column({ type: 'text', nullable: true })
    fcm_token?: string;
    //para vincularse con la tabla de smartwatch
    @OneToMany(() => SmartwatchLinkEntity, link => link.user)
    smartwatchLinks: SmartwatchLinkEntity[];
}