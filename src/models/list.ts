import {
    Association, DataTypes, Model, Sequelize,
} from 'sequelize'

class List extends Model {
    public name!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date;
    public updatedAt!: Date
    addUser: any;

    public static initialize(sequelize: Sequelize) {
        this.init({
            name: DataTypes.STRING
        }, { sequelize: sequelize, modelName:"List" })
    }
}

export default List