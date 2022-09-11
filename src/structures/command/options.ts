import {
  ApplicationCommandBooleanOptionData,
  ApplicationCommandNumericOptionData,
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ApplicationCommandRoleOptionData,
  ApplicationCommandStringOptionData,
  ApplicationCommandUserOptionData
} from "discord.js";

export function string(
  data: Omit<ApplicationCommandStringOptionData, "type">,
): ApplicationCommandOptionData {
  return { ...data, type: ApplicationCommandOptionType.String };
}

export function user(
  data: Omit<ApplicationCommandUserOptionData, "type">,
): ApplicationCommandOptionData {
  return { ...data, type: ApplicationCommandOptionType.User };
}


export function boolean(
  data: Omit<ApplicationCommandBooleanOptionData, "type">,
): ApplicationCommandOptionData {
  return { ...data, type: ApplicationCommandOptionType.Boolean };
}

export function integer(
  data: Omit<ApplicationCommandNumericOptionData, "type">,
): ApplicationCommandOptionData {
  return { ...data, type: ApplicationCommandOptionType.Integer };
}

export function role(
  data: Omit<ApplicationCommandRoleOptionData, "type">,
): ApplicationCommandOptionData {
  return { ...data, type: ApplicationCommandOptionType.Role };
}