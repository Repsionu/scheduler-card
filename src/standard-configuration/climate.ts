import { HassEntity } from "home-assistant-js-websocket";
import { levelVariable, listVariable, listVariableOption } from "../actionVariables";
import { ActionConfig } from "../types";
import { TurnOffAction } from "../const";
import { HomeAssistant } from "custom-card-helpers";

const modeIcons = {
  heat: "fire",
  cool: "snowflake",
  heat_cool: "thermometer",
  auto: "autorenew",
  dry: "water-percent",
  fan_only: "fan"
}

export function climateActions(entity_id: string, hass: HomeAssistant) {
  const stateObj = hass.states[entity_id];
  const supportedFeatures = stateObj.attributes.supported_features!;
  const presetModes = stateObj.attributes.preset_modes;
  const hvacModes = stateObj.attributes.hvac_modes;
  const filteredHvacModes = hvacModes.filter(e => !['off', 'heat', 'cool', 'heat_cool'].includes(e))

  const tempVariable = levelVariable({
    field: "temperature",
    min: stateObj.attributes.min_temp,
    max: stateObj.attributes.max_temp,
    unit: hass.config.unit_system.temperature,
    step: hass.config.unit_system.temperature.includes('C') ? 0.5 : 1,
  });

  let actions: ActionConfig[] = [];

  if (hvacModes.includes("off")) {
    actions.push({
      service: "set_hvac_mode",
      service_data: { hvac_mode: "off" },
      icon: "power"
    });
  }
  else {
    actions.push(TurnOffAction);
  }

  if (hvacModes.includes("heat") && supportedFeatures & 1) {
    actions.push({
      service: "set_temperature",
      service_data: { hvac_mode: "heat" },
      variable: tempVariable,
      icon: modeIcons.heat
    });
  }

  if (hvacModes.includes("cool") && supportedFeatures & 1) {
    actions.push({
      service: "set_temperature",
      service_data: { hvac_mode: "cool" },
      variable: tempVariable,
      icon: modeIcons.cool
    });
  }

  if (!hvacModes.includes("heat") && !hvacModes.includes("cool") && supportedFeatures & 1) {
    actions.push({
      service: "set_temperature",
      variable: tempVariable,
      icon: "thermometer"
    });
  }

  if (hvacModes.length > 1 && filteredHvacModes.length) actions.push({
    service: "set_hvac_mode",
    variable: listVariable({
      field: "hvac_mode",
      options: filteredHvacModes.map(e => listVariableOption(e, { icons: modeIcons }))
    }),
    icon: "cog-transfer-outline",
  });

  if (presetModes && presetModes.length && supportedFeatures & 16) actions.push({
    service: "set_preset_mode",
    variable: listVariable({
      field: "preset_mode",
      options: presetModes.map(e => listVariableOption(e))
    }),
    icon: "cloud-download-outline"
  });

  return actions;
}