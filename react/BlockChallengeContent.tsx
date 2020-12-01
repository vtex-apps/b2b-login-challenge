import React from 'react'
import {
  ExtensionPoint,
  Session,
  SessionResponse
} from 'vtex.render-runtime'

import useSessionResponse from './hooks/useSessionResponse'

const isProfileAllowed = (sessionResponse: SessionResponse | undefined) => {
  if (sessionResponse == null) {
    return null
  }

  const hasAccessToTradePolicy = (sessionResponse as Session).namespaces?.store
    ?.channel

  const isLoggedIn = (sessionResponse as Session).namespaces?.profile?.email


  // const channelFromUser = item.response.namespaces.store.channel.value
  // const pattern = /:\s|,\s/
  // const tradePolicyValue = challengeTradePolicy.split(pattern)
  // const result = tradePolicyValue.includes(String(channelFromUser))


  if (isLoggedIn && hasAccessToTradePolicy) {
    return 'authorized'
  }

  if (isLoggedIn) {
    return 'forbidden'
  }

  return 'unauthorized'
}

const BlockChallenge = () => {
  const sessionResponse = useSessionResponse()
  const profileCondition = isProfileAllowed(sessionResponse)

  if (!sessionResponse) {
    return null
  }

  const defaultHidden = sessionResponse == null

  if (
    defaultHidden ||
    profileCondition === 'unauthorized' ||
    profileCondition === 'forbidden'
  ) {
    return <ExtensionPoint id="challenge-fallback" />
  }

  return <ExtensionPoint id="challenge-content" />
}

export default BlockChallengeContent
