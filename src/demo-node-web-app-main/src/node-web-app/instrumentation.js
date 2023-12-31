/*instrumentation.js*/
// Require dependencies
// https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/#troubleshooting
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { PeriodicExportingMetricReader, ConsoleMetricExporter } = require('@opentelemetry/sdk-metrics');

const { OTLPTraceExporter} = require("@opentelemetry/exporter-trace-otlp-proto");
const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-proto");

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter()
  }),
  instrumentations: [getNodeAutoInstrumentations()]
});

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

sdk
  .start()