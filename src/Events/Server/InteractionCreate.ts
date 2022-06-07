import type { CacheType, CommandInteraction } from "discord.js";
import type { Ninym } from "../../Core/Ninym";
import type { EventRun } from "../../Core/NinymInterfaces";
import { inlineCode, codeBlock } from "@discordjs/builders";

export const run: EventRun = async (
    client: Ninym,
    interaction: CommandInteraction<CacheType>
): Promise<void> => {
    const logger = client.logger("Bot");

    if (interaction.isCommand()) {
        try {
            await client.commands.get(interaction.commandName).run(client, interaction);
        } catch (err: any) {
            await interaction.reply({
                embeds: [
                    {
                        title: "Something went wrong",
                        fields: [
                            { name: `Command`, value: inlineCode(interaction.commandName) },
                            { name: `Error`, value: codeBlock(err.stack.split("\n")[0]) }
                        ],
                        color: 0xff4d4d,
                        footer: {
                            text: `Please, tell ${
                                client.users.cache.get(client.application.owner.id).tag
                            } to fix that`
                        }
                    }
                ],
                ephemeral: true
            });

            logger.error(err.stack.split("\n")[0]);
        }
    }
};

export const name: string = "interactionCreate";
