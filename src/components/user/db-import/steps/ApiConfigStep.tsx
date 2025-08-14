'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Globe, 
  Key, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Plus,
  X
} from 'lucide-react';

interface ApiConfigStepProps {
  onApiConfigured: () => void;
}

export default function ApiConfigStep({ onApiConfigured }: ApiConfigStepProps) {
  const [selectedApiType, setSelectedApiType] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [authMethod, setAuthMethod] = useState<string>('');
  const [headers, setHeaders] = useState<{key: string, value: string}[]>([]);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'success' | 'error'>('none');
  const [newHeaderKey, setNewHeaderKey] = useState('');
  const [newHeaderValue, setNewHeaderValue] = useState('');

  const apiTypes = [
    { value: 'rest', label: 'REST API' },
    { value: 'graphql', label: 'GraphQL API' },
    { value: 'soap', label: 'SOAP API' },
    { value: 'custom', label: 'Custom API' }
  ];

  const authMethods = [
    { value: 'none', label: 'No Authentication' },
    { value: 'api-key', label: 'API Key' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'oauth', label: 'OAuth 2.0' }
  ];

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    
    // Simulate API connection test
    setTimeout(() => {
      setIsTestingConnection(false);
      // Simulate success for demo - in real app, make actual API call
      setConnectionStatus('success');
      onApiConfigured();
    }, 2000);
  };

  const addHeader = () => {
    if (newHeaderKey && newHeaderValue) {
      setHeaders([...headers, { key: newHeaderKey, value: newHeaderValue }]);
      setNewHeaderKey('');
      setNewHeaderValue('');
    }
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const isConfigurationValid = selectedApiType && apiUrl && (authMethod === 'none' || apiKey);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium flex items-center justify-center gap-2">
          <Database className="h-5 w-5 text-purple-600" />
          API Configuration
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configure your API settings to import data from external sources
        </p>
      </div>

      {/* API Type Selection */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-blue-600" />
          <h4 className="text-lg font-medium">API Type</h4>
        </div>
        
        <Select value={selectedApiType} onValueChange={setSelectedApiType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select API type" />
          </SelectTrigger>
          <SelectContent>
            {apiTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* API Configuration */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-green-600" />
          <h4 className="text-lg font-medium">API Configuration</h4>
        </div>
        
        <div className="space-y-4">
          {/* API URL */}
          <div>
            <Label htmlFor="api-url">API URL</Label>
            <Input
              id="api-url"
              type="url"
              placeholder="https://api.example.com/v1/data"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Authentication Method */}
          <div>
            <Label htmlFor="auth-method">Authentication Method</Label>
            <Select value={authMethod} onValueChange={setAuthMethod}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select authentication method" />
              </SelectTrigger>
              <SelectContent>
                {authMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key/Token */}
          {authMethod && authMethod !== 'none' && (
            <div>
              <Label htmlFor="api-key">
                {authMethod === 'api-key' ? 'API Key' : 
                 authMethod === 'bearer' ? 'Bearer Token' : 
                 authMethod === 'basic' ? 'Username:Password' : 'Token'}
              </Label>
              <Input
                id="api-key"
                type="password"
                placeholder={`Enter your ${authMethod === 'api-key' ? 'API key' : 'token'}`}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Custom Headers */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-5 w-5 text-purple-600" />
          <h4 className="text-lg font-medium">Custom Headers</h4>
          <span className="text-sm text-gray-500">({headers.length} headers)</span>
        </div>
        
        {/* Add Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          <Input
            placeholder="Header name"
            value={newHeaderKey}
            onChange={(e) => setNewHeaderKey(e.target.value)}
          />
          <Input
            placeholder="Header value"
            value={newHeaderValue}
            onChange={(e) => setNewHeaderValue(e.target.value)}
          />
          <Button 
            onClick={addHeader}
            disabled={!newHeaderKey || !newHeaderValue}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Header
          </Button>
        </div>

        {/* Headers List */}
        {headers.length > 0 && (
          <div className="space-y-2">
            {headers.map((header, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{header.key}</Badge>
                  <span className="text-sm text-gray-600">{header.value}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHeader(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Test Connection */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium">Test API Connection</h4>
            <p className="text-sm text-gray-500">Verify that your API configuration is working correctly</p>
          </div>
          <div className="flex items-center gap-4">
            {connectionStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Connected</span>
              </div>
            )}
            {connectionStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">Failed</span>
              </div>
            )}
            <Button
              onClick={handleTestConnection}
              disabled={!isConfigurationValid || isTestingConnection}
              className="flex items-center gap-2"
            >
              {isTestingConnection ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Connection'
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Configuration Summary */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md">
        <h5 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Configuration Summary</h5>
        <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
          <div>
            <strong>API Type:</strong> {selectedApiType ? apiTypes.find(t => t.value === selectedApiType)?.label : 'Not selected'}
          </div>
          <div>
            <strong>API URL:</strong> {apiUrl || 'Not configured'}
          </div>
          <div>
            <strong>Authentication:</strong> {authMethod ? authMethods.find(m => m.value === authMethod)?.label : 'Not selected'}
          </div>
          <div>
            <strong>Custom Headers:</strong> {headers.length} configured
          </div>
          <div>
            <strong>Status:</strong> {
              connectionStatus === 'success' ? 'Connected ✓' :
              connectionStatus === 'error' ? 'Connection Failed ✗' :
              'Not tested'
            }
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm text-blue-800 dark:text-blue-300">
        <p><strong>API Import Guidelines:</strong></p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Select the appropriate API type for your data source</li>
          <li>Ensure your API URL is accessible and returns the expected data format</li>
          <li>Configure authentication if required by your API</li>
          <li>Add any custom headers needed for your API requests</li>
          <li>Test the connection before proceeding to the next step</li>
        </ul>
      </div>
    </div>
  );
}
