import {
    Association, DataTypes, Model, Sequelize,
} from 'sequelize'
import { TaskFlag } from '../utils/enums'

class Todo extends Model {
    public title!: string
    public text!: string
    public deadline!: Date
    public authorId!: number
    public flag!: TaskFlag
    
    // Auto-generated
    public createdAt!: Date;
    public updatedAt!: Date

    public static initialize(sequelize: Sequelize) {
        this.init({
            title: DataTypes.STRING,
            text: DataTypes.STRING,
            authorId: {
                type: DataTypes.INTEGER,
                references:{
                    model:"Users"
                }
            },
            deadline: DataTypes.DATE,
            flag: {
                type: DataTypes.ENUM(...Object.values(TaskFlag))
            }
        }, { sequelize: sequelize, modelName:"Todo" })
    }
}

export default Todo