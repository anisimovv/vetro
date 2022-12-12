import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

const Construction = ({ constructionId }: { constructionId: string }) => {
  const { data: construction, isLoading } = trpc.construction.byId.useQuery({
    id: constructionId,
  });

  if (isLoading || !construction) {
    return <p>Завантаження</p>;
  }

  return (
    <article>
      <h1>{construction.name}</h1>
      <h2>Elements</h2>
      <ul>
        {construction.elements.map((element) => (
          <li key={element.id}>
            <ul>
              <li>Імʼя - {element.name}</li>
              <li>Мінімальне значення - {element.minValue}</li>
              <li>Максимальне значення - {element.maxValue}</li>
              <li>Стандартне значення - {element.defaultValue}</li>
            </ul>
          </li>
        ))}
      </ul>
    </article>
  );
};

const ConstructionDialog = ({
  isOpen,
  closeDialog,
  constructionId,
}: {
  isOpen: boolean;
  closeDialog: () => void;
  constructionId: string;
}) => {
  return (
    <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          {/* <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description> */}

          <Construction constructionId={constructionId} />

          <button onClick={closeDialog}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const AdminPage = () => {
  const { data: constructions, isLoading } = trpc.construction.all.useQuery();
  const [currentConstruction, setCurrentConstruction] = useState<string | null>(
    null
  );

  const openConstructionDialog = (id: string) => {
    setCurrentConstruction(id);
  };

  const closeConstructionDialog = () => {
    setCurrentConstruction(null);
  };

  if (isLoading || !constructions) {
    return <p>Завантаження</p>;
  }

  return (
    <>
      <ul>
        {constructions.map((construction) => (
          <li
            key={construction.id}
            onClick={() => openConstructionDialog(construction.id)}
          >
            {construction.name}
          </li>
        ))}
      </ul>
      <ConstructionDialog
        isOpen={!!currentConstruction}
        closeDialog={closeConstructionDialog}
        constructionId={currentConstruction as string}
      />
    </>
  );
};

export default AdminPage;
