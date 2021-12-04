import {
    Association, DataTypes, Model, Sequelize,
} from 'sequelize'

class User extends Model {
    public email!: string
    public password!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date;
    public updatedAt!: Date

    public static initialize(sequelize: Sequelize) {
        this.init({
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, { sequelize: sequelize , modelName:"User"})
    }
}

export default User
