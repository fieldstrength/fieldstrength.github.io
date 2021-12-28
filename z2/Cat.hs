{-# OPTIONS -Wall #-}
{-# LANGUAGE PolyKinds #-}
{-# LANGUAGE KindSignatures #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE TypeOperators #-}

-- | class definitions loosely based on the presentation in http://conal.net/papers/compiling-to-categories/
module Cat where

import Data.Kind (Type)
import Prelude hiding ((.), id)

-- | LAWS:
--   f . id = f
--   id . f = f
--   f . (g . h) = (f . g) . h
class Category (cat :: k -> k -> Type) where
  id :: cat a a
  (.) :: cat b c -> cat a b -> cat a c

instance Category ((->)) where
  id x = x
  (f . g) x = f (g x)

infixr 3 /\

class Category cat => Cartesian cat where
  (/\) :: cat a c -> cat a d -> cat a (c,d)
  projL :: cat (a,b) a
  projR :: cat (a,b) b

instance Cartesian (->) where
  projL (x,_) = x
  projR (_,y) = y
  f /\ g = \x -> (f x, g x)

infixr 2 \/

class Category cat => Cocartesian cat where
  (\/) :: cat a c -> cat b c -> cat (Either a b) c
  inL :: cat a (Either a b)
  inR :: cat b (Either a b)


-- Section 8


instance Cocartesian (->) where
  inL = Left
  inR = Right
  f \/ g = \case
    Left l -> f l
    Right r -> g r


class Cartesian cat => Closed cat where
  apply :: (a -> b, a) `cat` b
  curry :: cat (a,b) c -> cat a (b -> c)
  uncurry :: cat a (b -> c) -> cat (a,b) c

-- | LAWS:
--
-- f = apply . (curry f . projL /\ projR)
instance Closed (->) where
  apply (f,x) = f x
  curry f x y = f (x,y)
  uncurry f (x, y) = f x y


-- | Captures the distributive property of multiplication over addition
--   EXERCISE: implement default definitions of distribs in terms of each other. Require only one of the two
class (Cartesian cat, Cocartesian cat) => Distributive cat where
  distribL :: (a, (Either b c)) `cat` Either (a,b) (a,c)
  distribR :: Either (a,b) (a,c) `cat` (a, (Either b c))


instance Distributive (->) where
  distribL (x, Left l) = Left (x, l)
  distribL (x, Right r) = Right (x, r)

  distribR = \case
    Left (x,l) -> (x, Left l)
    Right (x,r) -> (x, Right r)


class Category cat => Terminal cat where
  it :: cat a ()

instance Terminal (->) where
  it = const ()












