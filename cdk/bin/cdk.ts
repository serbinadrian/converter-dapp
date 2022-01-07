#!/usr/bin/env node
import * as dotenv from 'dotenv';
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ConverterPipeLineStack } from '../lib/ConverterPipelineStack';

// dotenv Must be the first expression
dotenv.config();

const region = process.env.CDK_REGION;
const environment = <string>process.env.CDK_ENVIRONMENT;

const app = new cdk.App();
new ConverterPipeLineStack(app, `${environment}-converter-dapp-pipeline`, { env: { region } });

app.synth();
