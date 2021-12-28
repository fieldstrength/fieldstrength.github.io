{-# LANGUAGE DerivingVia #-}
{-# LANGUAGE DeriveFunctor #-}

import Control.Monad.Reader
import Control.Monad.State
import Control.Monad.Writer

import Data.Map
import qualified Data.Map as Map

data Message

class Monad m => MonadSendMessage m where
  sendMessage :: Message -> m ()


newtype TestMsg a = TestMsg (Writer [Message] a)
  deriving (Functor, Applicative, Monad, MonadWriter [Message])
    via Writer [Message]


data Context

newtype Runner a = Runner (ReaderT Context IO a)
  deriving (Functor, Applicative, Monad, MonadReader Context, MonadIO)
    via ReaderT Context IO

instance MonadSendMessage Runner where
  sendMessage _ = liftIO  {- use your imagination :-} (pure ())

-- The most prevailent and important effect in most computer systems is persistence.

data Conn

data Context2 = Context2 { connection :: Conn }

type DocumentId = Int

data Document = Document { documentId :: DocumentId, documentBody :: String }

newtype Runner2 a = Runner2 (StateT Document (ReaderT Context2 IO) a)
  deriving (Functor, Applicative, Monad, MonadReader Context2, MonadIO)
    via StateT Document (ReaderT Context2 IO)

class Monad m => MonadPersistDocument m where
  saveDocument :: Document -> m ()
  updateDocument :: Document -> m ()
  getDocument :: DocumentId -> m (Maybe Document)

newtype Test2 a = Test2 (StateT (Map DocumentId Document) (Writer [Message]) a)
  deriving (Functor, Applicative, Monad, MonadWriter [Message], MonadState (Map DocumentId Document))
    via StateT (Map DocumentId Document) (Writer [Message])

instance MonadPersistDocument Test2 where
  saveDocument doc = modify $ Map.insert (documentId doc) doc
  updateDocument doc = modify $ Map.adjust (const doc) (documentId doc)
  getDocument docId = gets $ Map.lookup docId




