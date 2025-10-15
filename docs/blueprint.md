# **App Name**: Architekt

## Core Features:

- Interactive Design Canvas: A drag-and-drop interface built with React Flow for visually constructing system architectures.
- Configurable Components: Dynamic configuration panel for setting parameters (algorithm, TTL, replicas, etc.) for each component.  Uses components defined in `componentsSchema.ts`
- Save Design to Firestore: Users can save their architecture designs, including component configurations and connections, to their personal Firestore collection.
- Load Design from Firestore: Users can load previously saved designs from their Firestore collection, allowing them to resume work or reuse existing architectures. As a tool, LLM reviews schema for errors.
- Export Design as JSON: Users can export their designs as JSON files, facilitating sharing and documentation. This can serve as configuration-as-code.
- Firebase Authentication: Secure user authentication using Firebase Auth (Google and Email login) to protect designs and user data.
- AI-Powered Design Feedback (Phase 2): Generate intelligent suggestions for improving the scalability, efficiency, and cost-effectiveness of system architectures based on current configurations.

## Style Guidelines:

- Primary color: Muted teal (#73A7A4), providing a professional and calming feel, relating to systems and architecture without being overly sterile.
- Background color: Very light grey (#F2F4F4), almost white, to create a clean and unobtrusive canvas.
- Accent color: Soft orange (#E59554) to highlight interactive elements and call-to-action buttons, drawing user attention.
- Body and headline font: 'Inter', a grotesque-style sans-serif with a modern look. Ensures readability and a clean aesthetic.
- Use simple, geometric icons for components in the library and status indicators. Icons should be monochromatic (same hue as primary color) to maintain a clean aesthetic.
- Use a clean, structured layout with the component library on the left, the design canvas in the center, and the configuration panel on the right.
- Subtle animations for node connections and configuration changes to enhance user experience and provide visual feedback.