import type { FC, SVGProps } from "react";
import {
  DatabaseIcon,
  ServerIcon,
  CacheIcon,
  LoadBalancerIcon,
  WebQueueIcon,
} from "@/components/dashboard/icons";

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
}

export const COMPONENTS_SCHEMA: ComponentSchema[] = [
  {
    type: "load-balancer",
    label: "Load Balancer",
    Icon: LoadBalancerIcon,
    description: "Distributes incoming network traffic across multiple servers.",
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
    ],
  },
  {
    type: "web-server",
    label: "Web Server",
    Icon: ServerIcon,
    description: "A server that handles HTTP requests from clients.",
    config: [
      {
        id: "replicas",
        label: "Replicas",
        type: "number",
        defaultValue: 3,
        description: "Number of server instances for scalability.",
      },
      {
        id: "instanceType",
        label: "Instance Type",
        type: "enum",
        defaultValue: "t2.micro",
        options: ["t2.micro", "t3.small", "m5.large"],
        description: "The compute instance size.",
      },
    ],
  },
  {
    type: "cache",
    label: "Cache",
    Icon: CacheIcon,
    description: "In-memory data store for fast data retrieval.",
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
    ],
  },
  {
    type: "database",
    label: "Database",
    Icon: DatabaseIcon,
    description: "Persistent storage for application data.",
    config: [
      {
        id: "type",
        label: "DB Type",
        type: "enum",
        defaultValue: "PostgreSQL",
        options: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
        description: "The database engine.",
      },
      {
        id: "replicas",
        label: "Read Replicas",
        type: "number",
        defaultValue: 1,
        description: "Number of read replicas for the database.",
      },
    ],
  },
  {
    type: "message-queue",
    label: "Message Queue",
    Icon: WebQueueIcon,
    description: "Asynchronous communication between services.",
    config: [
        {
            id: 'type',
            label: 'Queue Type',
            type: 'enum',
            defaultValue: 'RabbitMQ',
            options: ['RabbitMQ', 'SQS', 'Kafka'],
            description: 'The message queue technology.'
        },
        {
            id: 'retention',
            label: 'Retention (days)',
            type: 'number',
            defaultValue: 7,
            description: 'How long messages are retained.'
        }
    ]
  }
];
