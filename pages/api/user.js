import dbConnect from "../../db/connection";
import { User } from "../../db/models/user";
const { signToken } = require("../../src/utils/auth");
import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

const secret = process.env.SECRET;

