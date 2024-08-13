import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OpenAIAgent } from "../../clients/OpenAI/OpenAI";
import { assistantInstructions } from "../../instructions/AI";
import { FileUploader } from "../../components/fileUploader/FileUploader";
import { CampaignBanner } from "../../components/campaignBanner/CampaignBanner";
import { characterActions } from "../../store/slices/characters/characters";
import { v4 as uuid } from "uuid";

export const CreateCharacter: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  const [buttonText, setButtonText] =
    React.useState<string>("Create Character");
  const [creating, setCreating] = React.useState<boolean>(false);

  const characterFiles = React.useRef<File[]>([]);
  const inputRef = React.createRef<HTMLInputElement>();

  const handleCharacterCreation = async () => {
    if (!campaignId) return;

    // Create assistant
    // Associate assistant to campaign
    setCreating(true);
    const requestedCharacterName = inputRef.current!.value;

    setButtonText("Creating Character...");
    const assistant = await OpenAIAgent.client?.beta.assistants.create({
      name: requestedCharacterName,
      description: "Assistant for my campaign",
      model: "gpt-3.5-turbo",
      instructions: assistantInstructions.join("\n"),
      temperature: 0.25,
      tools: [{ type: "file_search" }],
    });

    let vectorStore;
    if (characterFiles.current?.length) {
      setButtonText("Creating vs...");
      // Create vector store
      vectorStore = await OpenAIAgent.client?.beta.vectorStores.create({
        name: `vs-${campaignId}-${requestedCharacterName}`,
      });

      // Upload files to vector store
      setButtonText("Uploading files...");
      await OpenAIAgent.client?.beta.vectorStores.fileBatches.uploadAndPoll(
        vectorStore.id,
        {
          files: characterFiles.current,
        }
      );

      // Associate vector store to assistant
      setButtonText("Associating...");
      await OpenAIAgent.client?.beta.assistants.update(assistant.id, {
        tool_resources: {
          file_search: {
            vector_store_ids: [vectorStore.id],
          },
        },
      });
    }

    dispatch(
      characterActions.addCharacter({
        characterId: uuid(),
        assistantId: assistant.id,
        campaign: campaignId,
        name: requestedCharacterName,
        vectorStoreId: vectorStore?.id,
      })
    );

    navigate(`/campaign/${campaignId}`);
  };

  const handleFileSelection = (files: File[]) => {
    characterFiles.current = files;
  };

  return (
    <div>
      <CampaignBanner />
      <div className="row">
        <div className="col s12">
          <p>Race: Half Elf</p>
          <p>Class: Rogue</p>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <input ref={inputRef} type="text" placeholder="Character Name" />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <FileUploader onFileSelection={handleFileSelection} />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <button disabled={creating} onClick={handleCharacterCreation}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
