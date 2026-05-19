import { useEffect, useState } from 'react'

import {
  deleteContactMessage,
  getContactMessages,
} from '../api/contactMessageApi'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import type { ContactMessageResponse } from '../types'

function formatCreatedAt(value: string): string {
  return new Intl.DateTimeFormat('sk', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingMessageId, setDeletingMessageId] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadMessages() {
      try {
        const contactMessages = await getContactMessages()
        setMessages(contactMessages)
      } catch {
        setErrorMessage('Správy sa nepodarilo načítať.')
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [])

  async function handleDeleteMessage(id: number) {
    setDeletingMessageId(id)
    setErrorMessage('')

    try {
      await deleteContactMessage(id)
      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== id),
      )
    } catch {
      setErrorMessage('Správu sa nepodarilo vymazať.')
    } finally {
      setDeletingMessageId(null)
    }
  }

  return (
    <main className="admin-contact-page">
      <section className="page-heading">
        <h1>Správy z formulára</h1>
      </section>

      {isLoading && <LoadingSpinner label="Načítavam správy..." />}
      <ErrorMessage message={errorMessage} />

      {!isLoading && !errorMessage && messages.length === 0 && (
        <p>Zatiaľ neboli odoslané žiadne správy.</p>
      )}

      {!isLoading && !errorMessage && messages.length > 0 && (
        <div className="contact-message-list">
          {messages.map((message) => (
            <article className="contact-message-card" key={message.id}>
              <div>
                <h2>{message.name}</h2>
                <div className="contact-message-card__meta">
                  <p>{formatCreatedAt(message.createdAt)}</p>
                  <button
                    type="button"
                    onClick={() => handleDeleteMessage(message.id)}
                    disabled={deletingMessageId === message.id}
                  >
                    {deletingMessageId === message.id
                      ? 'Vymazávam...'
                      : 'Vyriešené'}
                  </button>
                </div>
              </div>

              <dl>
                <div>
                  <dt>Telefón</dt>
                  <p>{message.phone}</p>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                  </dd>
                </div>
                <div className="full-width">
                  <dt>Správa</dt>
                  <p>{message.message || 'Bez správy.'}</p>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default AdminContactMessagesPage
