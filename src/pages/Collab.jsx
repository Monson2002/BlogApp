"use client";
import React from 'react'
import { Container } from '../components'

import { RoomProvider } from "../../liveblocks.config";
import { CollaborativeEditor } from "./CollaborativeEditor";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Collab() {
  return (
    <Container>
      <RoomProvider id="my-room" initialPresence={{}}>
        <ClientSideSuspense fallback="Loading…">
          {() => <CollaborativeEditor />}
        </ClientSideSuspense>
      </RoomProvider>
    </Container>
  );
}