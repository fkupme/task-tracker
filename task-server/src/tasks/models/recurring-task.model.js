const { Model, DataTypes } = require('sequelize');
const { Column, Table, BelongsTo, ForeignKey } = require('@nestjs/sequelize');
const { BaseTask } = require('./base-task.model');

@Table({ tableName: 'recurring_tasks' })
class RecurringTask extends Model {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false
  })
  week_day;

  @Column({
    type: DataTypes.STRING
  })
  general_comment;

  @Column({
    type: DataTypes.ARRAY(DataTypes.DATE)
  })
  exceptions;

  @ForeignKey(() => BaseTask)
  @Column
  baseTaskId;

  @BelongsTo(() => BaseTask)
  baseTask;
}

module.exports = { RecurringTask }; 