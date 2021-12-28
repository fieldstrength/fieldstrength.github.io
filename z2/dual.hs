{-# LANGUAGE DeriveFunctor #-}

module DualNumbers where

data Dual a = D a a
  deriving (Show, Eq, Functor)

instance Num a => Num (Dual a) where
  (D a b) + (D c d) = D (a + c) (b + d)
  (D a b) * (D c d) = D (a * c) (a*d + b*c)
  fromInteger n = D (fromInteger n) 0
  negate = fmap negate
  abs (D x _) = D (abs x) 0
  signum = error "no"



