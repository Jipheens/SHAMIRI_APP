import { DataTypes } from 'sequelize';

import connectDB from '../config/db.js';
import User from './userModel.js';

const sequelize = await connectDB();

const JournalEntry = sequelize.define(
  'JournalEntry',
  {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'journal_entries',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

JournalEntry.sync();

export default JournalEntry;
