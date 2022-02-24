export const _registrarName: string = "test";

import { SlashCommandBuilder } from "@discordjs/builders";
import type { CacheType, CommandInteraction } from "discord.js";
import type { Ninym } from "../Core/Ninym";
import type { CommandRun } from "../Core/NinymInterfaces";

export const run: CommandRun = async (
    client: Ninym,
    interaction: CommandInteraction<CacheType>
): Promise<void> => {
    await interaction.reply({ content: "pog" });
};

export const builderData: object = new SlashCommandBuilder()
    .setName("test")
    .setDescription("testu");
