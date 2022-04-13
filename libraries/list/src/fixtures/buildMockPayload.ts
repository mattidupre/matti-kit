import type { ListPayload } from '~/types';

type Config = [string] | [string, Array<Config>];

function buildPayloads(currentConfig: Config, parent: ListPayload = null): ListPayload {
  const [id, childConfigs] =
    typeof currentConfig === 'string' ? [currentConfig, null] : currentConfig;
  const payload: ListPayload = {
    direction: 'row',
    meta: { id },
    parent,
    children: null,
  };
  if (childConfigs) {
    payload.children = childConfigs.map((childConfig) =>
      buildPayloads(childConfig, payload),
    );
  }

  return payload;
}

const buildMockPayload = (config: Config) => buildPayloads(config);

export default buildMockPayload;
