-- Enable RLS
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create configurations table
CREATE TABLE IF NOT EXISTS configurations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_data JSONB,
  material TEXT CHECK (material IN ('pvc', 'alluminio')),
  category TEXT CHECK (category IN ('finestra', 'porta-finestra', 'porta-garage', 'persiane', 'scuri', 'tapparelle')),
  dimensions JSONB, -- {width: number, height: number, depth?: number}
  colors JSONB, -- {esterno: string, interno: string, profili: string}
  glass_type TEXT, -- Tipo di vetro scelto
  accessories JSONB, -- Array di accessori selezionati
  current_step INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quote_requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  configuration_id UUID REFERENCES configurations(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on tables
ALTER TABLE configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for configurations
CREATE POLICY "Users can view their own configurations"
  ON configurations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own configurations"
  ON configurations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own configurations"
  ON configurations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own configurations"
  ON configurations FOR DELETE
  USING (auth.uid() = user_id);

-- Allow guest configurations (no user_id)
CREATE POLICY "Allow guest configurations"
  ON configurations FOR ALL
  USING (user_id IS NULL);

-- Create policies for quote_requests
CREATE POLICY "Users can view their own quote requests"
  ON quote_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM configurations
      WHERE configurations.id = quote_requests.configuration_id
      AND (configurations.user_id = auth.uid() OR configurations.user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert their own quote requests"
  ON quote_requests FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM configurations
      WHERE configurations.id = quote_requests.configuration_id
      AND (configurations.user_id = auth.uid() OR configurations.user_id IS NULL)
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_configurations_user_id ON configurations(user_id);
CREATE INDEX IF NOT EXISTS idx_configurations_material ON configurations(material);
CREATE INDEX IF NOT EXISTS idx_configurations_category ON configurations(category);
CREATE INDEX IF NOT EXISTS idx_configurations_current_step ON configurations(current_step);
CREATE INDEX IF NOT EXISTS idx_configurations_created_at ON configurations(created_at);
CREATE INDEX IF NOT EXISTS idx_quote_requests_configuration_id ON quote_requests(configuration_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for configurations
CREATE TRIGGER update_configurations_updated_at
  BEFORE UPDATE ON configurations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
