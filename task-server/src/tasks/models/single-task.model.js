const { Model, DataTypes } = require('sequelize');
const { Column, Table, BelongsTo, ForeignKey } = require('@nestjs/sequelize');
const { BaseTask } = require('./base-task.model');

@Table({ tableName: 'single_tasks' })
class SingleTask extends Model {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id;

  @Column({
    type: DataTypes.DATE,
    allowNull: false
  })
  date;

  @Column({
    type: DataTypes.STRING
  })
  comment;

  @ForeignKey(() => BaseTask)
  @Column
  baseTaskId;

  @BelongsTo(() => BaseTask)
  baseTask;
}

module.exports = { SingleTask }; 