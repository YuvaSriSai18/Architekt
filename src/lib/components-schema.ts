
import type { FC, SVGProps } from "react";
import {
  DatabaseIcon,
  ServerIcon,
  CacheIcon,
  LoadBalancerIcon,
  WebQueueIcon,
  CdnIcon,
  ApiGatewayIcon,
  AuthServiceIcon,
  ObjectStorageIcon
} from "@/components/dashboard/icons";
import { 
    Shield, 
    Network, 
    Smartphone, 
    GitMerge,
    Waypoints
} from "lucide-react";

export interface ConfigParameter {
  id: string;
  label: string;
  type: "string" | "number" | "enum";
  defaultValue: string | number;
  options?: string[];
  description?: string;
}

export interface ComponentConfig {
  [key: string]: string | number;
}

export interface ComponentSchema {
  type: string;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  description: string;
  config: ConfigParameter[];
  color: string;
}

export const COMPONENTS_SCHEMA: ComponentSchema[] = [
  {
    type: "load-balancer",
    label: "Load Balancer",
    Icon: LoadBalancerIcon,
    description: "Distributes incoming network traffic across multiple servers.",
    color: "hsl(180, 40%, 80%)",
    config: [
      {
        id: "algorithm",
        label: "Algorithm",
        type: "enum",
        defaultValue: "round-robin",
        options: ["round-robin", "least-connections", "ip-hash"],
        description: "The method used to distribute requests.",
      },
      {
        id: "stickySessions",
        label: "Sticky Sessions",
        type: "enum",
        defaultValue: "disabled",
        options: ["enabled", "disabled"],
        description: "Binds a user's session to a specific server.",
      },
      {
        id: "healthCheckPath",
        label: "Health Check Path",
        type: "string",
        defaultValue: "/",
        description: "The path to check for server health.",
      },
    ],
  },
  {
    type: "web-server",
    label: "Web Server",
    Icon: ServerIcon,
    description: "A server that handles HTTP requests from clients.",
    color: "hsl(210, 40%, 80%)",
    config: [
      {
        id: "replicas",
        label: "Replicas",
        type: "number",
        defaultValue: 2,
        description: "Number of server instances for scalability.",
      },
      {
        id: "instanceType",
        label: "Instance Type",
        type: "enum",
        defaultValue: "t3.small",
        options: ["t2.micro", "t3.small", "m5.large", "c5.large"],
        description: "The compute instance size.",
      },
      {
        id: "autoscaling",
        label: "Autoscaling",
        type: "enum",
        defaultValue: "enabled",
        options: ["enabled", "disabled"],
        description: "Automatically adjust the number of replicas.",
      },
    ],
  },
  {
    type: "cache",
    label: "Cache",
    Icon: CacheIcon,
    description: "In-memory data store for fast data retrieval.",
    color: "hsl(60, 40%, 80%)",
    config: [
      {
        id: "ttl",
        label: "TTL (seconds)",
        type: "number",
        defaultValue: 60,
        description: "Time-to-live for cached items.",
      },
      {
        id: "policy",
        label: "Eviction Policy",
        type: "enum",
        defaultValue: "LRU",
        options: ["LRU", "LFU", "FIFO"],
        description: "Policy to evict items when cache is full.",
      },
      {
        id: "size",
        label: "Cache Size (MB)",
        type: "number",
        defaultValue: 1024,
        description: "The total size of the cache.",
      },
    ],
  },
  {
    type: "database",
    label: "Database",
    Icon: DatabaseIcon,
    description: "Persistent storage for application data.",
    color: "hsl(0, 40%, 80%)",
    config: [
      {
        id: "type",
        label: "DB Type",
        type: "enum",
        defaultValue: "PostgreSQL",
        options: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Cassandra"],
        description: "The database engine.",
      },
      {
        id: "replicas",
        label: "Read Replicas",
        type: "number",
        defaultValue: 1,
        description: "Number of read replicas for the database.",
      },
      {
        id: "sharding",
        label: "Sharding",
        type: "enum",
        defaultValue: "disabled",
        options: ["enabled", "disabled"],
        description: "Distribute data across multiple databases.",
      },
    ],
  },
  {
    type: "message-queue",
    label: "Message Queue",
    Icon: WebQueueIcon,
    description: "Asynchronous communication between services.",
    color: "hsl(300, 40%, 80%)",
    config: [
        {
            id: 'type',
            label: 'Queue Type',
            type: 'enum',
            defaultValue: 'RabbitMQ',
            options: ['RabbitMQ', 'SQS', 'Kafka', 'Pub/Sub'],
            description: 'The message queue technology.'
        },
        {
            id: 'retention',
            label: 'Retention (days)',
            type: 'number',
            defaultValue: 7,
            description: 'How long messages are retained.'
        },
    ]
  },
  {
    type: 'cdn',
    label: 'CDN',
    Icon: CdnIcon,
    description: 'Content Delivery Network for caching static assets.',
    color: "hsl(240, 40%, 80%)",
    config: [
      {
        id: 'provider',
        label: 'Provider',
        type: 'enum',
        defaultValue: 'Cloudflare',
        options: ['Cloudflare', 'Fastly', 'Akamai', 'CloudFront'],
        description: 'The CDN provider.',
      },
      {
        id: 'cachingPolicy',
        label: 'Caching Policy',
        type: 'string',
        defaultValue: 'Cache-Control: max-age=3600',
        description: 'Default caching headers for assets.',
      },
    ],
  },
  {
    type: 'api-gateway',
    label: 'API Gateway',
    Icon: ApiGatewayIcon,
    description: 'Manages and routes API requests.',
    color: "hsl(270, 40%, 80%)",
    config: [
      {
        id: 'protocol',
        label: 'Protocol',
        type: 'enum',
        defaultValue: 'REST',
        options: ['REST', 'GraphQL', 'gRPC', 'WebSocket'],
        description: 'The API protocol.',
      },
      {
        id: 'rateLimiting',
        label: 'Rate Limiting (req/s)',
        type: 'number',
        defaultValue: 100,
        description: 'Requests per second limit.',
      },
    ],
  },
  {
    type: 'auth-service',
    label: 'Auth Service',
    Icon: AuthServiceIcon,
    description: 'Handles user authentication and authorization.',
    color: "hsl(330, 40%, 80%)",
    config: [
      {
        id: 'provider',
        label: 'Auth Provider',
        type: 'enum',
        defaultValue: 'Firebase Auth',
        options: ['Firebase Auth', 'Auth0', 'Okta', 'Keycloak'],
        description: 'The authentication service provider.',
      },
      {
        id: 'sso',
        label: 'SSO Protocol',
        type: 'enum',
        defaultValue: 'OAuth 2.0',
        options: ['OAuth 2.0', 'SAML', 'OpenID'],
        description: 'Single Sign-On protocol.',
      },
    ],
  },
  {
    type: 'object-storage',
    label: 'Object Storage',
    Icon: ObjectStorageIcon,
    description: 'Scalable storage for unstructured data.',
    color: "hsl(90, 40%, 80%)",
    config: [
      {
        id: 'provider',
        label: 'Storage Provider',
        type: 'enum',
        defaultValue: 'S3',
        options: ['S3', 'Google Cloud Storage', 'Azure Blob Storage'],
        description: 'The object storage service provider.',
      },
    ],
  },
  {
    type: 'firewall',
    label: 'Firewall',
    Icon: Shield,
    description: 'Network security system that monitors and controls traffic.',
    color: "hsl(30, 40%, 80%)",
    config: [
      {
        id: 'rules',
        label: 'Default Policy',
        type: 'enum',
        defaultValue: 'deny',
        options: ['allow', 'deny'],
        description: 'Default action for traffic that does not match any rule.',
      },
    ],
  },
  {
    type: 'vpn-gateway',
    label: 'VPN Gateway',
    Icon: Network,
    description: 'Provides secure access to a private network.',
    color: "hsl(120, 40%, 80%)",
    config: [
      {
        id: 'type',
        label: 'VPN Type',
        type: 'enum',
        defaultValue: 'Site-to-Site',
        options: ['Site-to-Site', 'Client-to-Site'],
        description: 'Type of VPN connection.',
      },
    ],
  },
  {
    type: 'client-device',
    label: 'Client Device',
    Icon: Smartphone,
    description: 'End-user device, such as a browser, mobile, or desktop app.',
    color: "hsl(200, 40%, 80%)",
    config: [
      {
        id: 'deviceType',
        label: 'Device Type',
        type: 'enum',
        defaultValue: 'Web Browser',
        options: ['Web Browser', 'Mobile App', 'Desktop App'],
        description: 'The type of the client device.',
      },
    ],
  },
  {
    type: 'ci-cd-pipeline',
    label: 'CI/CD Pipeline',
    Icon: GitMerge,
    description: 'Automates the build, test, and deployment of applications.',
    color: "hsl(250, 40%, 80%)",
    config: [
      {
        id: 'provider',
        label: 'Provider',
        type: 'enum',
        defaultValue: 'GitHub Actions',
        options: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'CircleCI'],
        description: 'The CI/CD service provider.',
      },
    ],
  },
  {
    type: 'graphql-api',
    label: 'GraphQL API',
    Icon: Waypoints,
    description: 'API endpoint using the GraphQL query language.',
    color: "hsl(320, 60%, 80%)",
    config: [
      {
        id: 'framework',
        label: 'Framework',
        type: 'enum',
        defaultValue: 'Apollo Server',
        options: ['Apollo Server', 'Express GraphQL', 'Hasura'],
        description: 'The GraphQL server implementation.',
      },
    ],
  },
];

    