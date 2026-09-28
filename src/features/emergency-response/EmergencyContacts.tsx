const contacts = [
  { name: "Emergency response", number: "112" },
  { name: "Indore control room", number: "1916" },
];

export function EmergencyContacts() {
  return (
    <div className="border-t border-border px-4 py-3">
      <h3 className="mb-2 text-[10px] font-semibold uppercase text-muted-foreground">
        Emergency contacts
      </h3>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li key={contact.number} className="flex items-center justify-between gap-3 text-xs">
            <span>{contact.name}</span>
            <a
              className="font-semibold text-primary underline-offset-2 hover:underline"
              href={`tel:${contact.number}`}
            >
              {contact.number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
